
import express from 'express';
import path from 'path';



const hostingHandler = (router: express.Router) => {
    // Configure custom logger middleware
    router.use(express.static(path.join(__dirname,'..','..','..','public')));

    router.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname,'..','..','..','public/index.html'), function(err) {
            if (err) {
              res.status(500).send(err)
            }
          })
    });
};

export default [hostingHandler];