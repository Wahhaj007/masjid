import React, { useEffect, useState } from "react";
import {
    Button,
    InputGroup,
    FormControl,
    Form,
    Col,
    Row,
    Card,
    ToggleButton,
    ToggleButtonGroup,
} from "react-bootstrap";
import PayPal from "./paypal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./table.css";
import Stripe from "./stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const buttonlist1 = ["Membership Fee", "Donation", "Sadaqah", "Zakat"];

const PUBLIC_KEY =
    "pk_test_51JR4m9CMdg35S26EAT3K6nPEVlxPHubEwzlQ4c2VetzslZmjts2FNQKWxkwZAiQdIgA1kWbCbvmQBGWBrbRONn7a00BSJqSyYd";
const stripePromise = loadStripe(PUBLIC_KEY);

function PaymentForm({ addTextLog }) {
    const [profile, setProfile] = useState({
        Description: "",
        PaymentMethod: "",
        Firstname: "",
        Lastname: "",
        Email: "",
        Amount: "",
        Status: "Processing",
        Type: "Outgoing",
        Comment: ""
    });

    const [clientSecret, setClientSecret] = useState("");

    const [selectedMethod, setSelectedMethod] = useState(false);

    const [paypal, setPayPal] = useState(false);

    const [payments, setPayments] = useState([]);
    useEffect(() => {
        const getAllPayments = async () => {
            try {
                const res = await axios.get("/payments");
                setPayments(res.data);
                console.log("refreshed");
            } catch (e) {
                console.log(e);
            }
        };
        getAllPayments();
    }, []);

    const saveNewPayment = async (p) => {
        const res = await axios.post("/payments", p);
        const newpayments = [...payments, res.data];
        setPayments(newpayments);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const emailOnChange = ({ target }) => {
        const { name, value } = target;
        if (value.match("^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$") != null) {
            setProfile({
                ...profile,
                [name]: value,
            });
        };
    }

    const handleSubmit = (e) => {
        console.log("submitting...");
        saveNewPayment(profile);
    };

    return (
        <React.Fragment>
            <div className="bg-image">

                <Form onSubmit={handleSubmit}
                    noValidate>
                    <div className="ml-3 mt-3 mb-5 middle">
                        <Card>
                            <h5 className="ml-3 mt-3">Reason for Payment<mark class="red">*</mark></h5>
                            <Row>
                                <ToggleButtonGroup required type="radio" name="Description"
                                    style={{ width: "100%", height: "100%" }}
                                    className="ml-5 mr-5"
                                    noValidate
                                >
                                    {buttonlist1.map((buttonLabel, i) => (
                                        <ToggleButton
                                            id={"radio" + i}
                                            value={buttonLabel}
                                            variant="outline-primary"
                                            className="mb-3"
                                            onChange={handleChange}
                                        >
                                            {buttonLabel}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Row>
                            <h5 className="ml-3 mt-5">Payment Method<mark class="red">*</mark></h5>
                            <Row>
                                <ToggleButtonGroup type="radio" name="PaymentMethod"
                                    style={{ width: "100%", height: "100%" }}
                                    className="ml-5 mr-5"
                                    required
                                    noValidate
                                >
                                    <ToggleButton id="radio1" value={"PayPal"}
                                        variant="outline-primary"
                                        onClick={() => setPayPal(true) & setSelectedMethod(true)}
                                        onChange={handleChange}
                                    >
                                        PayPal
                                    </ToggleButton>
                                    <ToggleButton id="radio2" value={"Stripe"}
                                        variant="outline-primary"
                                        onClick={() => setPayPal(false) & setSelectedMethod(true)}
                                        onChange={handleChange}
                                    >
                                        Card (Stripe)
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Row>
                            <h5 className="ml-3 mt-5">User Information<mark class="red">*</mark></h5>
                            <Row className="ml-3 mr-3"/*TODO: fix the spacing for first/last name*/>
                                <Col>
                                    <text>First Name<mark class="red">*</mark></text>
                                    <Form.Control
                                        required
                                        placeholder="First Name"
                                        value={profile.Firstname}
                                        name="Firstname"
                                        aria-label="firstname"
                                        aria-describedby="firstname"
                                        onChange={handleChange}
                                        noValidate
                                    />
                                </Col>
                                <Col>
                                    <text>Last Name<mark class="red">*</mark></text>
                                    <Form.Control
                                        required
                                        placeholder="Last Name"
                                        value={profile.Lastname}
                                        name="Lastname"
                                        aria-label="lastname"
                                        type="text"
                                        aria-describedby="lastname"
                                        onChange={handleChange}
                                        noValidate
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <text className="ml-5 mt-3">Email<mark class="red">*</mark></text>
                                <Form.Control
                                    required
                                    className="ml-5 mr-5"
                                    placeholder="Email"
                                    value={profile.Email}
                                    name="Email"
                                    type="email"
                                    aria-label="email"
                                    aria-describedby="email"
                                    onChange={handleChange}
                                />
                            </Row>
                            <Row>
                                <text className="ml-5 mt-3">Amount<mark class="red">*</mark></text>
                                <Form.Control
                                    required min="0"
                                    className="ml-5 mr-5"
                                    onKeyDown={(evt) => evt.key === '-' | evt.key === 'e' && evt.preventDefault()}
                                    placeholder="$"
                                    value={profile.Amount}
                                    name="Amount"
                                    aria-label="Amount"
                                    aria-describedby="Amount"
                                    onChange={handleChange}
                                    type="number"
                                    noValidate
                                />
                            </Row>
                            <Row>
                                <text className="ml-5 mt-3">Comments</text>
                                <InputGroup>
                                    <FormControl as="textarea" value={profile.Comment} aria-label="With textarea" name="Comment" aria-label="Comments" aria-describedby="Comment" type="text"
                                        className="ml-5 mr-5"
                                        onChange={handleChange} />
                                </InputGroup>
                            </Row>
                            <Row className="ml-2">
                                <Col className="mt-3 ml-3 mr-2 mb-3">
                                    <Button variant="danger" id="clear3" type="reset" value="Reset">
                                        Clear
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="center mb-3">
                                <div className="mt-3">
                                    {selectedMethod ?
                                        (paypal ?
                                            (
                                                <PayPal />
                                            ) : (
                                                <Elements stripe={stripePromise}>
                                                    <Stripe
                                                        profile={profile}
                                                        handleSubmitData={handleSubmit}
                                                        clientSecret={clientSecret}
                                                    />
                                                </Elements>
                                            )) : (
                                            () => setSelectedMethod(false)
                                        )}
                                </div>
                            </Row>
                            <Row
                                className="center mb-3">
                                {paypal ? (
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={() => alert(JSON.stringify(profile, "", 2))}>
                                        Pay Now
                                    </Button>
                                ) : (
                                    () => setPayPal(false)
                                )}
                            </Row>
                        </Card>
                        <div className="right ml-5">
                            <Button
                                onClick={() => console.log(payments)}>
                                Payment List (Console)
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    );
}

export default PaymentForm;
