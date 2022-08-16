import React, { useState, useEffect, useRef } from 'react';
import Home from './pages/home';
import Details from './pages/details';
import NotFound from './pages/not-found';
import parseRoute from './lib/parse-route';
import Settings from './pages/settings';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function App(props) {

  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const prevRoute = usePrevious(route);

  useEffect(() => {
    if (route !== prevRoute) {
      window.scrollTo(0, 0);
    }
  });

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
    return () => {
      window.removeEventListener('hashchange', () => {
        setRoute(parseRoute(window.location.hash));
      });
    };
  }, []);

  const renderPage = () => {
    const { path } = route;
    if (path === '') {
      return <Home />;
    } else if (path.includes('details')) {
      return <Details />;
    } else if (path.includes('settings')) {
      return <Settings />;
    } else {
      return <NotFound />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}
