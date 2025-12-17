export default function HomePage({ user }) {
   
    return(
        <>
        {user ? (<div style={{display: "flex", justifyContent: "center", fontSize: "60px"}}>Добро пожаловать {user.name}</div>) : (<div style={{display: "flex", justifyContent: "center", fontSize: "60px"}}>Авторизуйтесь</div>)}
        </>
    )
}
