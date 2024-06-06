import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {useEffect, useState} from "react";


function App() {
    const [totalSpent, setTotalSpent] = useState(0)

    // Fetch total spent from the server
    useEffect(() => {
      async function fetchTotalSpent() {
        const response = await fetch("/api/expenses/total-spent")
        const data = await response.json()
        setTotalSpent(data.totalSpent)
      }
      fetchTotalSpent();
    }, [])

    return (
        <Card className="w-[350px] mx-auto">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>The total amount you've spent </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{totalSpent}</p>
          </CardContent>

        </Card>

    )
}

export default App
