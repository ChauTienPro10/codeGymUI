import { useEffect, useState } from 'react';
import { usePostCompile } from './usePostCompile';
export const useJavaCompileHandler = (compileUrl: string, runUrl: string, testUrl: string, code: string, language: string) => {
  const [output, setOutput] = useState('');
  const [sttOutput, setSttOutput] = useState(0);

  type TestCase = {
    input: string;
    expectedResult: string;
    status: boolean;
  };
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const {
    data: compileData,
    error: errorCompile,
    loading: loadingCompile,
    post: postCompile,
  } = usePostCompile(compileUrl);

  const {
    data: runData,
    error: errorRun,
    loading: loadingRun,
    post: postRun,
  } = usePostCompile(runUrl);

  const {
    data: testData,
    error: errorTest,
    loading: loadingTest,
    post: postTest,
  } = usePostCompile(testUrl);

  const handleCompile = () => {
    postCompile({
      language,
      code,
      idUser: 1002,
    });
  };

  const handleRun = () => {
    postRun({
      language,
      code,
      idUser: 1002,
      challengeId: 2,
    });
  };

  const handleTest = () => {
    postTest({
      language,
      code,
      idUser: 1002,
      challengeId: 2,
    });
  };

  useEffect(() => {
    if (compileData) {
      setSttOutput(0);
      setOutput("Compile successfull");
    } else if (errorCompile) {
      setSttOutput(1);
      setOutput(errorCompile);
    }
  }, [compileData, errorCompile]);

  useEffect(() => {
    if (runData) {
      setSttOutput(0);
      setOutput(runData?.data?.result || '');
      setTestCases([])
    } else if (errorRun) {
      setSttOutput(1);
      setOutput(errorRun);
    }
  }, [runData, errorRun]);

  useEffect(() => {
    if (testData) {
      setSttOutput(0);
      setTestCases(testData?.data || []);
      setOutput("");
    } else if (errorTest) {
      setSttOutput(1);
      setOutput(errorTest);
    }
  }, [testData, errorTest]);

  return {
    handleCompile,
    handleRun,
    handleTest,
    output,
    testCases,
    loading: loadingCompile || loadingRun || loadingTest,
    sttOutput,
  };
};
