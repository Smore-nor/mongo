


import {MongoClient, ServerApiVersion} from 'mongodb'
    
const uri = (process.env.DB_URI as string)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Querying our database
    const cursor = await client.db("prod_db").collection("blogs").find();
    const array = await cursor.toArray()
    return array;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


export default async function Database() {
    const blogs =  await run();
    return (<>

   <ul className="text-4xl">
               {blogs.map((movie) => (
                   <li className="text-center pt-12" key={movie._id.toString()}>
                     
                       <h2 className="font-bold text-2xl">{movie.title}</h2>
                       <h2>{movie.description}</h2>
                       <h2 >{movie.excerpt}</h2>

                       <div className="text-2xl font-bold text-blue-400" >{movie.category}</div>
                       
                   </li>
               ))}
           </ul>


    </>)
  }