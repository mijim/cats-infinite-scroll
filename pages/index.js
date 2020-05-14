import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [catsArray, setCatsArray] = useState([]);
  const [catPage, setCatPage] = useState(0);
  const refContainer = useRef(null);

  useEffect(() => {
    getCats(0);
    window.addEventListener('scroll', () => {
      if (refContainer && refContainer.current && isInViewport(refContainer.current)) {

      }
    });
  }, []);

  const getCats = async (page) => {
    const catJson = await fetch(`https://api.thecatapi.com/v1/images/search?limit=6&page=${page}`);
    const cats = await catJson.json();
    setCatsArray(catsArray.concat(cats));
  }

  const isInViewport = (el) => {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

  return (
    <div className="container">
      <div className="title">
        Tu cura para la depresión
      </div>
      <div className="cats-container">
        <InfiniteScroll
          dataLength={catsArray.length}
          next={() => { setCatPage(catPage + 1); getCats(catPage) }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {catsArray.map((cat, index) => (
            <img src={cat.url} ref={index === catsArray.length - 1 ? refContainer : null} />
          ))}
        </InfiniteScroll>

      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 30px;
          padding-top: 30px;
          font-weight: bold;
          background:black;
        }
        .title {
          margin-bottom: 80px;
          color: white;
        }
        .cats-container {
          text-align: center;
        }

        .cats-container img{
          max-width: 80vw;
          margin-bottom: 20px;
        } 
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
