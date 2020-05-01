const React = require("react");
const {
  Body,
  Footer,
  Main,
  H1,
  H2,
  H3,
  P,
  Section,
} = require("react-alegrify-ui");

const Head = require("../../components/lib/head");

function Index() {
  return (
    <html lang="en" dir="ltr">
      <Head title="My amazing website" />
      <Body>
        <Main>
          <H1>Static site</H1>

          <Section>
            <H2>Project structure</H2>

            <H3>components/src</H3>
            <P>
              The `components` folder contains isomorphic components. (both
              server and client side)
            </P>
            <P>
              Import the `lib` folder variant of a component to use it into
              pages or clientside js.
            </P>

            <H3>pages/src</H3>
            <P>
              All files directly under `pages/src` will be generated into html
              pages.
            </P>
            <P>For example, `index.js` will become `index.html`</P>
            <P>These components only render on build time</P>

            <H3>client-js/src</H3>
            <P>This is all JS that will actually be sent to the client.</P>
            <P>
              Every file directly under `client-js/src` will become a separate
              bundle.
            </P>

            <H3>static</H3>
            <P>
              The static folder contains all assets, pictures, fonts,... that
              will be copied into the production build
            </P>
          </Section>
        </Main>
        <Footer textCenter>
          This project was bootstrapped with
          <a
            className="alegrify-a"
            href="https://www.npmjs.com/package/alegrify-static-site"
          >
            alegrify-static-site
          </a>
        </Footer>
      </Body>
    </html>
  );
}

module.exports = Index;
