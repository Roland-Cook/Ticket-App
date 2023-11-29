

import TicketCard from "./(components)/TicketCard"

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets",{
      cache: "no-store"
    })
    console.log(res)
    return res.json()

  }

  catch (error){
    console.log(error)

  }
}

const Dashboard = async () => {

  const { tickets } = await getTickets()
  console.log(tickets)

  const categories = [
    ...new Set(tickets.map(({category})=>category))

  ]
  return (
    <div className="p-5">
        <div>
          {tickets && categories.map((uniqueCategory, categoryindex) => 
            <div className="mb-4" key={categoryindex}>
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets.filter((ticket) => ticket.category === uniqueCategory).map((filteredTicket, _index) => (
                  <TicketCard id={_index} key={_index} ticket={filteredTicket}/>
                ))}
              </div>
            </div>
            )}
        </div>
    </div>

  )
}

export default Dashboard
