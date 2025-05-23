import React, { useState, useEffect  } from 'react';
import './CodeEditor.scss';
import '../taiwind.css';
import AceEditor from 'react-ace';
import { Rnd } from "react-rnd";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import { useFetch } from '../useFetch';
import { useJavaCompileHandler } from './useJavaCompileHandler';
import { useParams } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const compileUrl = `${SERVER_URL}/java/compile/`;
const runUrl = `${SERVER_URL}/java/compile/run`;
const testUrl = `${SERVER_URL}/java/compile/runWithTestcases`;

const CodeEditor: React.FC = () => {
    const { id } = useParams();
    const [language, setLanguage] = useState('javascript');

    // xử lý cho code defaulf.
    const [code, setCode] = useState('');
    const { data, loading, error } = useFetch<any>(`${SERVER_URL}/java/compile/challenge/${id}`);
    useEffect(() => {
      if (language === 'javascript') {
         setCode("output");
      }

      if (language === 'java') {
        setCode(data.data.template);
      }
    }, [language]);
    ////////////////////////////////////////////////

    const { handleCompile, handleRun, handleTest, testCases, output,  loading: compileLoading, sttOutput } = useJavaCompileHandler(
      id ? id : "null",
      compileUrl,
      runUrl,
      testUrl,
      code,
      language
    );

    return (
      <div className='main-page-editor'>
        <div className='chanlenge-container'>
          <h3>Tiêu đề bài toán</h3>
          <p>{data?.data?.content}</p>
          <h3>Ví dụ input-output</h3>
          <p>Input : {data?.data?.simpleInput}</p>
          <p>Output : {data?.data?.simpleOutput}</p>
        </div>
        <div className="editor-container">
          <div className="toolbar">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c_cpp">C/C++</option>
            </select>
            <div className='action'>
              <button onClick={handleCompile}>Compile</button>
              <button onClick={handleRun}>▶ Run</button>
              <button onClick={handleTest}>Submit</button>
            </div>
          </div>
    
          <Rnd
            default={{
              x: 0,
              y: 60,
              width: '100%',
              height: 400,
            }}
            minHeight={200}
            maxHeight={600}
            bounds="parent"
            enableResizing={{
              bottom: true,
            }}
            disableDragging
            resizeHandleComponent={{
              bottom: <div className="resize-handle" />,
            }}
            style={{
              border: 'none',
              borderRadius: '8px',
              position: 'relative',
              transform: 'translate(0px, 0px)',
            }}
          >
            <AceEditor
              mode={language}
              theme="monokai"
              onChange={(val) => setCode(val)}
              value={code}
              name="codeEditor"
              editorProps={{ $blockScrolling: true }}
              width="100%"
              height="100%"
              fontSize={16}
              setOptions={{
                useWorker: false,
              }}
            />
          </Rnd>
          <div className="output">
            <h3>{compileLoading ? 'Loading...' : 'Output'}</h3>
            <pre style={{ color: sttOutput === 1 ? 'red' : 'green' }}>{output}</pre>

          </div>

          <div className="test-cases-container">
            <h3 className="text-lg font-semibold mb-3 text-white">Test Cases</h3>

                    <div className="gap-4" style={{ display: 'flex', flexWrap: 'wrap', rowGap: '1rem', columnGap: '10rem'}}>
                      {testCases.map((testCase, index) => {
                        const statusColor =
                          testCase.status === true
                            ? 'border-green-500'
                            : testCase.status === false
                            ? 'border-red-500'
                            : 'border-gray-700';

                        return (
                          <div
                            key={index}
                            className={`w-[300px] bg-[#1e1e1e] rounded-md p-3 border ${statusColor}`}
                          >
                            <p className="text-sm">
                              <span
                                className={`font-medium ${
                                  testCase.status === true
                                    ? 'text-green-400'
                                    : testCase.status === false
                                    ? 'text-red-400'
                                    : 'text-gray-300'
                                }`}
                              >
                                Input #{index + 1}:
                              </span>{' '}
                              <span
                                className={`${
                                  testCase.status === true
                                    ? 'text-green-300'
                                    : testCase.status === false
                                    ? 'text-red-300'
                                    : 'text-white'
                                }`}
                              >
                                {testCase.input}
                              </span>
                            </p>

                            <p className="text-sm text-blue-400 mt-2">
                              <span className="font-medium">Expected Output:</span>{' '}
                              {testCase.expectedResult}
                            </p>
                          </div>
                        );
                      })}
                </div>
</div>

        </div>
      </div>
    );
  };
  
  export default CodeEditor;