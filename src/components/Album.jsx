import React from 'react';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useState, useEffect } from 'react'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://humphraylegare.github.io/">
        humphraylegare.github.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles({
    icon: {
      // marginRight: theme.spacing(2),
    },
    heroContent: {
      // backgroundColor: theme.palette.background.paper,
      // padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      // marginTop: theme.spacing(4),
    },
    cardGrid: {
      // paddingTop: theme.spacing(8),
      // paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      // backgroundColor: theme.palette.background.paper,
      // padding: theme.spacing(6),
    },
})

  /**
  * @param {string} content 
  * @param {string} url
  * @desc 'replace [+ n] words from description and by url to article'
  */
 function addUrlToArticle(content, url){
   const regex = /[\[+]{1,}[0-9]{1,}[\s]{1}[a-z]{1,}[\]]{1}/gmi;
   return content.replace(regex, "")
 }

 const Album = (props) => {

  const [news, setNews] = useState([]);


  async function fetchNews() {
    //create headers
    let httpHeaders = {
      'Accept':'applications/json',
    }

    let headers = new Headers(httpHeaders)

    //create request
    let complete_url = process.env.REACT_APP_NEWS_API_URL + `q=coronavirus&from=2020-03-20&sortBy=popularity&apikey=` + process.env.REACT_APP_NEWS_API_KEY;
    let request = new Request(complete_url, {
      headers: headers,
      method: 'GET',
      mode: 'cors'
    })
    
    //fetch the news api
    try {
      const res = await fetch(request)
      res.json()
      .then((data) => {
        console.log(data.articles, ".then")
        setNews(data.articles)
      })
      
    } catch {
      //@TODO implement catch error
    }
  }

  useEffect(() => {
    
    fetchNews()
    console.log(news, "useeffect")
  }, [])

  const t = []

  

  let classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {news.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    src={card.urlToImage}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                    <Link color="inherit" href={card.url}>
                      Read more
                    </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Coronavirus Realtime
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  ); 
}

export default Album