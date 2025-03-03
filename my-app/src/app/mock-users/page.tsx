type MockUser = {
    id: number;
    name: string
};

export default async function MockUsers(){
   const response = await fetch("https://67c5cbdd351c081993fb7884.mockapi.io/users");
   const users = await response.json();

   return (
    <div className="py-10">
        <form className="mb-4">
            <input type="text" name="name" required className="border p-2 mr-2"></input>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add user</button>
        </form>
    <ul className="grid grid-cols-4 gap-4 py-10">
        {users.map((user: MockUser) => (
            <li
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700">
                {user.name}
            </li>
        ))}
    </ul>
    </div>
)
}  