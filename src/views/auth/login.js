import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Button,
    Label,
    Card,
    CardBody,
    CardFooter
} from "reactstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userActions } from '../../redux/actions/user';
import Spinner from '../../components/spinner/spinner';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            isChecked: true,
            loading: false,
        };

    }

    componentDidMount() {
        this.props.logout();        
    }

    handleChecked = e => {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }

    logginUser = async e => {
        this.setState({loading: true});
        const { username, password } = this.state;
        const { history, logger } = this.props
        if (username && password) {
            const user = await logger(username, password);
            if (user) {
                if (user.user.group === "administrativo"){
                    history.push('/clientes');
                }
                else {
                    history.push('/deudas');
                }
            } else {
                this.setState({error: "Usuario o contraseña incorrecta"})
            }
        }
        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <div className="container">
                <Row className="full-height-vh">
                    <Col xs="12" className="d-flex align-items-center justify-content-center">
                        <Card className="gradient-blue-grey-blue text-center width-400">
                            <CardBody>
                                <h2 className="white py-4">Login</h2>
                                
                                <Form className="pt-2">
                                    <FormGroup>
                                        <Col md="12">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                id="username"
                                                placeholder="Usuario"
                                                required
                                                onChange={this.handleChange('username')}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col md="12">
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                id="password"
                                                placeholder="Contraseña"
                                                required
                                                onChange={this.handleChange('password')}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col md="12">
                                            <Button
                                                type="submit"
                                                color="blue"
                                                className="btn-raised"
                                                onClick={(event) => { this.logginUser() }}
                                                block
                                            >
                                                Ingresar!
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                    {this.state.error && <h5 className="red">{this.state.error}</h5>}
                                    <FormGroup>
                                        <Row>
                                            <Col md="12">
                                                <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
                                                    <Input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        checked={this.state.isChecked}
                                                        onChange={this.handleChecked}
                                                        id="rememberme"
                                                    />
                                                    <Label className="custom-control-label float-left white" for="rememberme">
                                                        Recordarme
                                       </Label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </FormGroup>                                    
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <div className="float-left">
                                    <NavLink to="/forgot-password" className="text-white">
                                        Olvidaste la contraseña?
                           </NavLink>
                                </div>
                                <div className="float-right">
                                    <NavLink to="/register" className="text-white">
                                        Registrate ahora
                           </NavLink>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}




const mapDispatchToProps = dispatch => ({
    logger: (username, password) => dispatch(userActions.login(username, password)),
    logout: () => dispatch(userActions.logout()),
})


export default withRouter(connect(null, mapDispatchToProps)(Login));