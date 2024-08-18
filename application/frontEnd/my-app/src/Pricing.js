import React from "react";
import HeaderHome from "./Header";
import Footer from "./Footer";
import "./styles/Pricing.css";

function Pricing() {
    return (
        <>
            <HeaderHome />
            <div className="containerPricing">
                <div className="pricingHookText">
                    <h1>Simple and Transparent Pricing</h1>
                    <p>Manage your team effortlessly with our flexible pricing plans. Choose the plan that suits your needs and scale as you grow.</p>
                </div>
                <div className="pricingPlans">
                    <div className="planBox freePlan">
                        <h2>Free</h2>
                        <p>Manage up to 100 users for free. Ideal for small teams and startups.</p>
                        <ul>
                            <li>Track Members</li>
                            <li>Create and Assign Tasks</li>
                            <li>Provide Recognitions</li>
                        </ul>
                    </div>
                    <div className="planBox businessPlan">
                        <h2>Business</h2>
                        <p>Manage more than 100 users. Perfect for growing teams and enterprises.</p>
                        <ul>
                            <li>All features in Free plan</li>
                            <li>Advanced Reporting</li>
                            <li>Priority Support</li>
                            <li>Custom Integrations</li>
                        </ul>
                        <p className="price">$49/month</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Pricing;
