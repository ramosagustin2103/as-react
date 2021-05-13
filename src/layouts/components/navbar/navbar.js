// import external modules
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
   Form,
   Collapse,
   Navbar,
   Nav,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from "reactstrap";

import {Select} from "../../../components/Select"

import {
   // Moon,
   Menu,
   MoreVertical,
   User,
   Bookmark,
   LogOut
} from "react-feather";
import userImage from "../../../assets/img/svg/assistant.svg";
import { connect } from 'react-redux';

import { userActions } from '../../../redux/actions/user';

class ThemeNavbar extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu("open");
   };
   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false
      };
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   logout() {
      const { history } = this.props;
      this.props.logoutUser();
      history.push('/login');
   }


   changeCommunity(value) {
      const { changeCommunityUser } = this.props;
      changeCommunityUser(value)
        .then((response) => {
         window.location.reload(false)
        })
        .catch((errors) => {
         const { data } = errors;
          console.log(data)
        })
    }


   render() {
      const { user } = this.props;
      return (
         <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
            <div className="container-fluid px-0">
               <div className="navbar-header">
                  <Menu
                     size={14}
                     className="navbar-toggle d-lg-none float-left"
                     onClick={this.handleClick.bind(this)}
                     data-toggle="collapse"
                  />
                  <Form className="navbar-form mt-1 float-left" role="search">
                     <h2>{user.community}</h2>
                  </Form>
                  {/* <Moon size={20} color="#333" className="m-2 cursor-pointer"/> */}
                  <MoreVertical
                     className="mt-1 navbar-toggler black no-border float-right"
                     size={50}
                     onClick={this.toggle}
                  />
               </div>

               <div className="navbar-container">
                  <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto float-right" navbar>

                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <img src={userImage} alt="logged-in-user" className="rounded-circle width-35" />
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem disabled>
                                 <span className="font-small-3">
                                    {user.profile.nombre} <span className="text-muted">({user.user.group})</span>
                                 </span>
                              </DropdownItem>
                              <DropdownItem divider />

                              <Link to="/user-profile" className="p-0">
                                 <DropdownItem>
                                    <User size={16} className="mr-1" /> Ver Perfil
                                 </DropdownItem>
                              </Link>
                              {user.admin_of.length > 0 && <Select
                                 name="comunidad"
                                 id="comunidad"
                                 classNamePrefix="select"
                                 options={user.admin_of.map(c => ({label: c, value: c}))}    
                                 onChange={(option) => this.changeCommunity(option.value)}
                                 value={user.community}
                                 />}
                              
                              {/* <Link disabled to="/faq" className="p-0"> */}
                                 <DropdownItem disabled>
                                    <Bookmark size={16} className="mr-1" /> Biblioteca y FAQ
                                 </DropdownItem>
                              {/* </Link> */}
                              <DropdownItem divider />
                              <DropdownItem>
                                 <div onClick={(event) => { this.logout() }} >
                                    <LogOut size={16} className="mr-1" /> Logout
                                 </div>
                              </DropdownItem>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                     </Nav>
                  </Collapse>
               </div>
            </div>
         </Navbar>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.auth,
});


const mapDispatchToProps = dispatch => ({
   logoutUser: () => dispatch(userActions.logout()),
   changeCommunityUser: (community) => dispatch(userActions.changeCommunity(community))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThemeNavbar));