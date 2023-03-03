import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-card/movie-card.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { HeartSwitch } from '@anatoliygatt/heart-switch';

// The entire movies array has to be passed into the MovieView prop because React Router only allows access to
function MovieView({ movies, topmovies, handleToggle }) {
  // Accesses movieId URL param that has been defined in the movie-card component
  const { movieId } = useParams();
  const movie = movies.find(function (m) {
    return m._id === movieId;
  });

  let isLiked = topmovies.includes(movieId);

  let similarMovies = movies.filter(function (similarMovie) {
    return (
      similarMovie.Genre.Name === movie.Genre.Name &&
      similarMovie.Title !== movie.Title
    );
  });

  let printSimilarMovies;
  // Checking if there are similar movies at all
  if (similarMovies.length === 0) {
    printSimilarMovies = (
      <Col className="mt-4">No similar movies in database.</Col>
    );
  } else {
    printSimilarMovies = similarMovies.map(function (movie) {
      // Bootstrap utility class mb stands for margin bottom and the number for the sixe (0-5)
      return (
        <Col
          className="mt-4"
          key={movie._id}
          xl={2}
          lg={3}
          md={4}
          sm={6}
          xs={6}
        >
          <MovieCard movie={movie}></MovieCard>
        </Col>
      );
    });
  }

  return (
    <>
      <Row>
        <Col xs={12} lg={8} className="flex-column">
          <Row>
            <h1>{movie.Title}</h1>
          </Row>
          <Row className="mt-4">
            <Col md={2}>Director:</Col>
            <Col>{movie.Director.Name}</Col>
          </Row>
          <Row className="mt-2">
            <Col md={2}>Genre:</Col>
            <Col>{movie.Genre.Name}</Col>
          </Row>
          <Row className="mb-4 mt-4">
            <Col>{movie.Description}</Col>
          </Row>
          <HeartSwitch
            size="md"
            inactiveTrackFillColor="#FFEECA"
            inactiveTrackStrokeColor="#A78D5C"
            activeTrackFillColor="#f7be16"
            activeTrackStrokeColor="#A78D5C"
            inactiveThumbColor="#ecfeff"
            activeThumbColor="#ecfeff"
            checked={isLiked}
            onChange={function (event) {
              event.preventDefault();
              handleToggle(isLiked, movieId);
            }}
          />
        </Col>
        <Col xs={12} lg={4}>
          <img className="w-100 mb-4" src={movie.ImagePath} />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5">
          <h2>Similar movies</h2>
        </Col>
      </Row>
      <Row>{printSimilarMovies}</Row>
      <Row className="mb-4 mt-3">
        <div className="align-right">
          <Button
            as={Link}
            to={`/`}
            variant="secondary"
            className="btn-secondary"
          >
            Back
          </Button>
        </div>
      </Row>
    </>
  );
}

export { MovieView };

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    // shape({}) means it's an object
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
      }).isRequired,
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    TopMovies: PropTypes.array,
  }).isRequired,
  addMovie: PropTypes.func.isRequired,
  removeMovie: PropTypes.func.isRequired,
};
