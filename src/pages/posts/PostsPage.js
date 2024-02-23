import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NoResults from "../../assets/no_results.svg";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function PostsPage({message, filter = ""}) {
    const [posts, setPosts] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    const [query, setQuery] = useState(""); 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data} = await axiosReq.get(`/posts/?${filter} search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.error(err);
            }
        };
   setHasLoaded(false);
   const timer = setTimeout(() => {
         fetchPosts();
    }, 1000);
    return () => clearTimeout(timer);
    }, [filter, query, pathname]);
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        < i className = {`fas fa-search $ {styles.SearchIcon}`} /> 
        <Form className={styles.SearchBar}
        onSubmit = {(e) => e.preventDefault()} >
            <Form.Control 
            value = {query}
            onChange = {(e) => setQuery(e.target.value)}
            type = "text" 
            className="mr-sm-2" 
            placeholder = "Search Posts" />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
                <InfiniteScroll
                children = {
                    posts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setPosts} />
                      ))
                }
                dataLength = {posts.results.length}
                loader = {<Asset spinner />}
                hasMore = {!!posts.next}
                next = {()=> fetchMoreData(posts, setPosts)}
                />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
