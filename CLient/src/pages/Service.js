/* eslint-disable jsx-a11y/img-redundant-alt */
import { useAuth } from "../store/auth";

const Service = ()=>{
    const {services} = useAuth();

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">
                {
                    services.map((current_element, index)=>{
                        const {service, description, price, provider} = current_element;

                        return(
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img src="/images/Dodge Challenger.jpg" alt="image" width={500} height={500}/>
                            </div>
                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>Provider: {provider}</p>
                                    <p>Price: {price}</p>
                                </div>
                                <h2>Service: {service}</h2>
                                <p>Description: {description}</p>
                            </div>
                        </div>
                        );
                    })
                }
            </div>
        </section>
    )
}

export default Service;