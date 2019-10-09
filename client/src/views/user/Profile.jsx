import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import * as AuthServices from "./../../services/auth-api";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.onFileChange = this.onFileChange.bind(this);
  }

  componentDidMount() {
    AuthServices.signedIn()
      .then(user => {
        this.setState({
          user
        });
        console.log("loged in", user.name);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onFileChange(event) {
    const data = new window.FormData();
    data.append("image", event.target.files[0]);
    AuthServices.uploadPicture(data)
      .then(user => {
        console.log(user);
        this.setState({
          user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const userOne = this.state.user;
    return (
      (!userOne && (
        <div>
          <h1 className="text-white">Loading profile...</h1>
        </div>
      )) || (
        <Container>
          <Row className="d-flex justify-content-center">
            <Card
              bg="transparent"
              text="info"
              border="info"
              className="my-5 px-3"
              style={{ width: "45rem" }}
            >
              <Card.Body className="mt-3">
                <Form>
                  <Row>
                    <Col>
                      <Image
                        variant="top"
                        src={userOne.image}
                        alt={userOne.name}
                        style={{ maxHeight: "300px", Width: "400px" }}
                      />
                      <Form.Group className="text-center">
                        <Form.Control
                          id="profile-photo"
                          type="file"
                          name="image"
                          onChange={this.onFileChange}
                          className="text-white"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <h2 className="text-info ">{userOne.name}'s Profile</h2>
                      <h4 className="text-white font-weight-lighter mt-3">
                        {userOne.email}
                      </h4>
                      <h5 className="text-info font-weight-lighter">
                        {userOne.role}
                      </h5>

                      <Link to="/profile-edit">
                        <Button className="my-3" variant="info">
                          Edit Profile
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Form>
                <h2 className="text-info font-weight-lighter text-center">
                  {userOne.name}'s Profile
                </h2>
                <h4 className="text-white font-weight-lighter">
                  {userOne.email}
                </h4>
                <h4 className="text-info">{userOne.role}</h4>
                <Link to="/profile-edit">
                  <Button className="my-3" variant="info">
                    Edit Profile
                  </Button>
                </Link>
                {userOne.role === "admin" && (
                  <Fragment>
                    <Link to="/create-interview-question">
                      <Button variant="outline-info" className="ml-3">
                        Create Interview Question
                      </Button>
                    </Link>
                    <Link to="/create-geo">
                      <Button variant="outline-info" className="ml-3">
                        Create Geography Test
                      </Button>
                    </Link>
                  </Fragment>
                )}
              </Card.Body>
            </Card>
            <Row>
              {userOne.role === "admin" && (
                <Fragment>
                  <Link to="/create-interview-question">
                    <Button variant="outline-info" className="ml-3">
                      Create Interview Question
                    </Button>
                  </Link>
                  <Link to="/create-geo">
                    <Button variant="outline-info" className="ml-3">
                      Create Geography Test
                    </Button>
                  </Link>
                </Fragment>
              )}
            </Row>
            )
          </Row>
        </Container>
      )
    );
  }
}
