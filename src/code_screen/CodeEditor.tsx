import React, { useState } from 'react';
import './CodeEditor.scss';
import AceEditor from 'react-ace';
import { Rnd } from "react-rnd";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

const SERVER_URL = process.env.SERVER_URL;
const CodeEditor: React.FC = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('// Write your code here');
    const [output, setOutput] = useState('');
  
    const handleRun = () => {
      // Fake output (thay bằng API thực sau này)
      setOutput(`Output for ${language}:\n${code}`);
    };

    const handleCompile = () => {
      console.log(SERVER_URL);
      const payload = {
        language: language,    
        code: code,          
      };
    
      fetch(`http://localhost:8080/java/compile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Xử lý kết quả trả về, ví dụ: setOutput(data.output)
        })
        .catch((err) => {
          console.error('Compile error:', err);
        });
    };

    type TestCase = {
      input: string;
      expectedOutput: string;
      passed?: boolean; 
    };

    
const [testCases, setTestCases] = useState<TestCase[]>([
  { input: "2 3", expectedOutput: "5", passed: true },
  { input: "4 5", expectedOutput: "9", passed: false },
  { input: "10 20", expectedOutput: "30" },
]);

  
    return (
      <div className='main-page-editor'>
        <div className='chanlenge-container'>
          <h3>Tiêu đề bài toán</h3>
          <p>Nội dung thử thách</p>
          <h3>Ví dụ input-output</h3>
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
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>

          <div className="test-cases-container">
            <h3 className="text-lg font-semibold mb-3 text-white">Test Cases</h3>

                    <div className="gap-4" style={{ display: 'flex', flexWrap: 'wrap', rowGap: '1rem', columnGap: '10rem'}}>
                      {testCases.map((testCase, index) => {
                        const statusColor =
                          testCase.passed === true
                            ? 'border-green-500'
                            : testCase.passed === false
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
                                  testCase.passed === true
                                    ? 'text-green-400'
                                    : testCase.passed === false
                                    ? 'text-red-400'
                                    : 'text-gray-300'
                                }`}
                              >
                                Input #{index + 1}:
                              </span>{' '}
                              <span
                                className={`${
                                  testCase.passed === true
                                    ? 'text-green-300'
                                    : testCase.passed === false
                                    ? 'text-red-300'
                                    : 'text-white'
                                }`}
                              >
                                {testCase.input}
                              </span>
                            </p>

                            <p className="text-sm text-blue-400 mt-2">
                              <span className="font-medium">Expected Output:</span>{' '}
                              {testCase.expectedOutput}
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