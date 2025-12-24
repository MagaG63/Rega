import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";

function NavBar({ user, logoutHandler }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {!user ? (
          <Navbar.Brand>Гость</Navbar.Brand>
        ) : (
          <Navbar.Brand>{user.name}</Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            {!user ? (<>
            <Nav.Link as={Link} to="/rega">Регистрация</Nav.Link> <Nav.Link as={Link} to="/login">Вход</Nav.Link>
            </>) :
              ( <>
                <Nav.Link as={"button"} onClick={logoutHandler}>
                  Выход
                </Nav.Link>
                <Nav.Link as={Link} to="/add">Добавить</Nav.Link>
              <Nav.Link as={Link} to="/my">Мое</Nav.Link>
              </>   
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
