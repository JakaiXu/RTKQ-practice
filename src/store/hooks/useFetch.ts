import { useCallback, useState } from "react";
type ResObj = {
  url: string;
  method: string | null;
};

export const useFetch = (resObj: ResObj, cb: () => void) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const fetchStuData = useCallback(async (body:any) => {
    try {
      setIsLoading(true);
      setIsError(null);
      const res = await fetch(`http://localhost:1337/api/` + resObj.url, {
        method: resObj.method || "get",
        headers: {
          "Content-type": "application/json",
        },
        body: body
          ? JSON.stringify({
              data: body,
            })
          : null,
      });
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
        setIsLoading(false);
        cb && cb();
      } else {
        throw new Error("data loading failed");
      }
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading, isError, fetchStuData };
};
