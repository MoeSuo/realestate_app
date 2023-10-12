import Link from "next/link";

export default function UserMenu(props) {
    console.log(props)
    return (

        <div className=" absolute  bg-[white] p-4 right-[0rem] ">
            {
                !props.user && <div className="unregistred flex flex-col gap-2 min-w-[200px]">
                    <div className="">
                        <Link href="/user/login" >Login</Link>
                    </div>
                    <div className="">
                        <Link href="/user/signup">Signup</Link>
                    </div>
                </div>
            }
            {
                props.user && <div className="registred flex flex-col gap-2 min-w-[200px]">
                    <div className="font-bold">{props.user?.name}</div>
                    <div className="">
                        <Link href="/user/profile">Profile</Link>
                    </div>
                    <div className="">
                        <button onClick={props.signOut}>Sign out</button>
                    </div>
                </div>
            }
        </div>
    )
}