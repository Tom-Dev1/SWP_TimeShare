import "./SignUp.scss";
const SignUp = () => {
    const handleChange = (e) => {
        console.log(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="signup-bg">
            <h1 className="signup-title">Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    className="signup-input"
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                />
                <input className="signup-input" type="email" placeholder="email" id="email" onChange={handleChange} />
                <input
                    className="signup-input"
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                />
                <button className="signup-button">Sign Up</button>
            </form>
            <div>
                <p>Have an account ? </p>
            </div>
        </div>
    );
};

export default SignUp;
