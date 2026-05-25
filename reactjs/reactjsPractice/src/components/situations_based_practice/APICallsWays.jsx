import react, {useEffect, useState} from "react"

function APICallsWays () {
    const [data, setData] = useState(null);

    useEffect(() => {
        // fetch + .then()
        fetch(url)
        .then((r) => r.json())
        .then((data) => setData(data.data))
        .catch((e) => new Error(e))
        .finally(() => console.log("settled"))


        // fetch + async/await
        const getData = async () => {
            try {
                const res = await fetch(url);
                const data = res.json();
                setData(data.data);
            } catch (err) {
                throw new Error(err);
            } finally {
                console.log("settled");
            }
        }

        async function getData1 () {
            
        }


    }, [])

    return  (
        <></>
    )
}

export default APICallsWays