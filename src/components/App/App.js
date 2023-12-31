import "./App.css";

import {
  Container,
  Menu,
  Segment,
  // Button,
  Dimmer,
  Loader,
  Pagination,
} from "semantic-ui-react";

import { NavLink, Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ReposResults from "../ReposResults/ReposResults";
import Message from "../Message/Message";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [newSearch, setNewSearch] = useState("react");
  const [repositoriesError, setRepositoriesError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const segmentStyle = {
    margin: "0",
  };

  const loadRepositories = async () => {
    // Avant l'appel à l'API => charger les données en passant loading dans state à "true"
    setLoading(true);
    try {
      const response = await axios.get(
        // `https://api.github.com/search/repositories?q=${newSearch}`
        `https://api.github.com/search/repositories?q=${newSearch}&sort=stars&order=desc&page=${currentPage}&per_page=30`
      );
      // MAJ de la liste des repos dans State
      setRepositories(response.data.items);
      // MAJ Nbre de repos dans State
      setTotalCount(response.data.total_count);
      // MAJ du Nbre de pages nécéssaires à l'affichage de tous les résultats
      // arrondi à l’entier supérieur
      setTotalPages(Math.ceil(response.data.total_count / 30));
      console.log(totalPages);
      console.log(response);
      // console.log(response.data.items);
      // console.log(repositories);
    } catch (error) {
      alert("Le serveur ne fonctionne plus, revenez plus tard.");
      // Capture l'erreur
      setRepositoriesError(error);
    } finally {
      // le callback passé à finally est toujours appelé par axios
      // que la requête soit ok ou soit en erreur
      setLoading(false); //arrêter l’indicateur de chargement
    }
  };

  useEffect(() => {
    // console.log("App est rendu");
    loadRepositories();
    // console.log("Chargement repos 1er affichage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Surveiller la modification de currentpage en le passant en 2eme paramètre à useEffect()

  const handlePaginationChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  return (
    <Container fluid className="app">
      <Segment>
        <Header />
        <Menu style={segmentStyle}>
          <Menu.Item>
            <NavLink to="/">Recherche</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/faq">FAQ</NavLink>
          </Menu.Item>
        </Menu>

        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <Segment className="ui-loader">
                  <Dimmer active inverted>
                    <Loader size="huge" active inline="centered">
                      Loading
                    </Loader>
                  </Dimmer>
                </Segment>
              ) : (
                // Sinon afficher Fragment Message + searchBar + Liste repos
                <>
                  <Message totalCount={totalCount} newSearch={newSearch} />

                  <SearchBar
                    newSearch={newSearch}
                    setNewSearch={setNewSearch}
                    loadRepositories={loadRepositories}
                  />

                  {repositoriesError ? (
                    // Passer l’erreur à <Message>
                    <Segment>
                      <p>
                        Attention ! Une erreur est survenue :
                        {repositoriesError.message}
                      </p>
                    </Segment>
                  ) : (
                    <>
                      <ReposResults repositories={repositories} />
                      <div className="pagination">
                        <>
                          <Pagination
                            className="pagination"
                            defaultActivePage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePaginationChange}
                            boundaryRange={0}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            // siblingRange={1}
                            size="mini"
                          />
                        </>
                        {/* // Homemade pagination
                        <Button
                          className="ui primary basic button"
                          title="Page précédente"
                          type="button"
                          onClick={() => {
                            setCurrentPage(currentPage - 1);
                          }}
                        >
                          <i className="angle double left icon"></i>
                          Préc.
                        </Button>
                        <Button
                          className="ui primary basic button top attached"
                          title="Page suivante"
                          type="button"
                          onClick={() => {
                            setCurrentPage(currentPage + 1);
                          }}
                        >
                          Suiv.
                          <i className="angle double right icon"></i>
                        </Button> */}
                      </div>
                    </>
                  )}
                </>
              )
            }
          />
          <Route
            path="/faq"
            element={
              <Segment>
                <p>A quoi ça sert ? </p>
                <p>A explorer les repositories sur GitHub</p>
                <p>
                  En plus ils sont classés par nombre d'<span>&#11088;</span>{" "}
                </p>
                <p>C'est fascinant !</p>
              </Segment>
            }
          />

          <Route
            path="*"
            element={
              <Segment>
                <h1>Oups, une erreur 404 : Cette page n'existe pas</h1>
              </Segment>
            }
          />
        </Routes>
      </Segment>
    </Container>
  );
}

export default App;
