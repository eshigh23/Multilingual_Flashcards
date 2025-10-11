
export default function Welcome(user) {

    return (
        <div>
            <p className="main--header">Welcome!</p>
            { user ? (
                <p className="main--subheader">Select a deck to begin studying.</p>
            ):(
                <p className="main--subheader">Log in to get started.</p>
            )}
        </div>
    )
}