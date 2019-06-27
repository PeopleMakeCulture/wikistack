const express = require('express');
const router = express.Router();
const models = require("../models");
//why can't we do {Page, User} = models - We're not export them; try it, read error logs
const Page = models.Page;
const User = models.User;
// We can destructure views and add all of them simultaenously from the views folwer
//const wikipage = require('../views/wikipage');
const { main, addPage, editPage, wikiPage } = require("../views");
//where are we using layout again?
//const layout = require('../views/layout')

// homepage
router.get('/', async function (req, res, next) => {
	try {
		const pages = await Page.findAll();
		res.send(main(pages));
	} catch (err) {
		next(err);
	}

});

// wiki post
router.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    const page = await Page.create(req.body);

    page.setAuthor(user);

    res.redirect("/wiki/" + page.slug);
  } catch (error) { next(error) }
});

//search - this is new!
router.get("/search", async (req, res, next) => {
  try {
    const pages = await Page.findByTag(req.query.search);
    res.send(main(pages));
  } catch (error) { next(error) }
});

router.post("/:slug", async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect("/wiki/" + updatedPages[0].slug);
  } catch (error) { next(error) }
});

//deleting
router.get("/:slug/delete", async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });

    res.redirect("/wiki");
  } catch (error) { next(error) }
});

// /wiki/add
// why is this not async?
// we are just sending an html I think - not awaiting anything from db
router.get("/add", (req, res) => {
  res.send(addPage());
});

// /wiki/(dynamic value)
router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
      //don't forget eager loading! w/ alias!
      include: [
        {model: User, as: 'author'}
      ]
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikiPage(page, author));
    }
  } catch (error) { next(error) }
});

router.get("/:slug/edit", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  } catch (error) { next(error) }
});

// /wiki/(dynamic value) - new to me!
router.get("/:slug/similar", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if (page === null) {
      res.sendStatus(404);
    } else {
      const similar = await page.findSimilar(); //check out this method in models
      res.send(main(similar));
    }
  } catch (error) { next(error) }
});

module.exports = router;