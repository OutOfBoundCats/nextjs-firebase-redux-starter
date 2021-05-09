import Head from "next/head";
import { useEffect } from "react";
import { connect } from "react-redux";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import {
  serverRenderClock,
  startClock,
} from "../../redux/reducers/tick/action";
import { wrapper } from "../../redux/store/store";
import { addCount } from "../../redux/reducers/count/action";
import Page from "../../components/Page";
import { bindActionCreators } from "redux";

const Index = (props) => {
  useEffect(() => {
    const timer = props.startClock();

    return () => {
      clearInterval(timer);
    };
  }, [props]);

  return <Page title="Index Page" linkTo="/other" tick="" />;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(serverRenderClock(true));
  store.dispatch(addCount());
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Index);
