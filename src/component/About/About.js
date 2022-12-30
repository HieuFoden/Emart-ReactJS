import { NavLink } from "react-bootstrap";

const About = (props) => {
    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary fw-bold mb-4">AKIについて</h1>
                        <p className="lead">
                            AKISHOPは勉強のため、自分で、作るサイトであり、確かにバグやミスなどがまだ残ってるに違いない。
                        </p>
                        <p className="lead">
                            サイトには応用したツールとライブラリー :
                        </p>
                        <p className="lead">
                            Front-End :
                        </p>
                        <p className="lead">
                            &nbsp;&nbsp;&nbsp;&nbsp;ReactJS, React-router-dom, Boostrap, Axios, Redux, Lodash...
                        </p>
                        <p className="lead">
                            Back-End :
                        </p>
                        <p className="lead">
                            &nbsp;&nbsp;&nbsp;&nbsp;NodeJS, Express, Sequelize, JsonWebToken...
                        </p>
                        <hr />
                        <p className="lead">
                            皆様がご覧になって、ご意見や指摘などをいただければ、ありがたいです。
                        </p>
                        <p className="lead">
                            どうぞ宜しくお願いいたします。
                        </p>
                        <NavLink to='/contact' className="btn btn-outline-primary px-3">連絡</NavLink>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                        <img src="/assets/about.jpg" alt="About Us" height="400px" width="400px" />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default About;