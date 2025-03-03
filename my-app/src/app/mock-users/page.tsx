import { revalidatePath } from "next/cache";
import { auth, currentUser} from "@clerk/nextjs/server"

type MockUser = {
    id: number;
    name: string
};

export default async function MockUsers(){
    const authObj = await auth();
    const userObj = await currentUser();

    console.log({
        authObj,
        userObj
    })

   const response = await fetch("https://67c5cbdd351c081993fb7884.mockapi.io/users");
   const users = await response.json();

   async function addUser(formData: FormData){
    "use server"
    const name = formData.get("name")
    const res = await fetch("https://67c5cbdd351c081993fb7884.mockapi.io/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        }
    )
    const newUser = await res.json();
    revalidatePath("/mock-users")
    console.log(newUser);
   }

   return (
    <div className="py-10">
        <form action={addUser} className="mb-4">
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