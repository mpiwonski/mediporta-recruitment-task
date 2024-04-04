import {useQuery} from "@tanstack/react-query"

import {TableComponent} from "./components/Table"
function App() {
    const {data, error, isLoading} = useQuery({queryKey:["tags"], queryFn: async () => {
        try {
            const response = await fetch("https://api.stackexchange.com/2.3/tags?site=stackoverflow");
            return await response.json();
        } catch (error) {
            console.log(error)
        }
        }})

    const cells = ["name", "count"];
    const numOfElements : number = 5;

    if (error) return <div className="flex justify-center items-center">An error has occurred while fetching data</div>

  return (
    <div className="flex flex-col justify-center items-center gap-4">
        {isLoading  ? <div>As soon as data has been loaded, table will be displayed here...</div> : <TableComponent rows={data.items} cells={cells} numOfElements={numOfElements}/>}
    </div>
  )
}

export default App
