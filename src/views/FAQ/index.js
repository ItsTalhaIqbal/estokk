
import React, { Component, useEffect, useState  } from 'react';
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { withTranslation } from 'react-i18next';
import  Card  from './components/Card';
import Overview from './components/Overview';
import FaqHeader from './components/FaqHeader';
import SubMenu from './components/SubMenu';
import Article from './components/Article'
import {useParams} from 'react-router-dom';

import { axiosGet } from '../../services/axios';

import './faq.css';
// import faqs from './faq.json'


function FAQ() {

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    axiosGet("/api/faq/list").then((response) => {
      let result = response.data;
      setArticles(result.categories);
    })
  },[]);
    // const { t } = this.props;
    // const FAQs = [
    //   {label: t("faqs.What is a blockchain?"), key: "first", content: "asdf1"},
    //   {label: t("faqs.What is a token? What is ‘tokenization’?"), key: "2nd", content: "asdf2"},
    //   {label: t("faqs.What are the benefits of tokenized real estate?"), key: "3rd", content: "asdf3"},
    //   {label: t("faqs.How are properties chosen for inventory?"), key: "4th", content: "asdf4"},
    //   {label: t("faqs.Who holds the deed to the house?"), key: "5th", content: "asdf5"},
    //   {label: t("faqs.How do we ensure each LLC owns the deed on its property?"), key: "6th", content: "asdf6"},
    //   {label: t("faqs.Who manages the properties?"), key: "7th", content: "asdf7"},
    //   {label: t("faqs.What happens if the tenant does not pay rent?"), key: "8th", content: "asdf8"},
    //   {label: t("faqs.How much do I need to invest?"), key: "9th", content: "asdf9"},
    //   {label: t("faqs.What can I do with my Tokens?"), key: "10th", content: "asdf10"},
    // ]

    const match = useParams();
    const {id, subtitleId} = match;
    // const articles = faqs.categories;

    let article = {
      id:"",
      title: "",
      image: "",
      desc: "",
      number: "",
      subtitle: []
    }

    let detail = {
      title: "",
      content: ""
    }

    articles.map((item) => {
      if(item.id === id) {
        article.id = item.id;
        article.title = item.title;
        article.image = item.image;
        article.desc = item.desc;
        article.number = item.number;
        article.subtitle = item.subtitle
      }
    });

    article.subtitle.map((item, index) => {
      if(item.id === subtitleId) {
        detail.title = item.smallTitle;
        detail.content = item.content;
        detail.id = index;
      }
    })

    return (
      <div style={{marginBottom: "100px"}}>
        <FaqHeader />
          {id !== undefined ? (
            subtitleId !== undefined ? (
              <Article
                id={article.id}
                title={detail.title}
                content={detail.content}
                upTitle={article.title}
                upTitleId={id}
              />
            ) : (
            <SubMenu 
              id={article.id}
              title={article.title}
              image={article.image}
              desc={article.desc}
              number={article.number}
              subtitle={article.subtitle}
            />)
          ) :<Overview />}           
      </div>
    )
 
}

export default withTranslation() (FAQ);