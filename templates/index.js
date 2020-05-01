const React = require("react");
const { Body, Footer, Main, H1, P, Section } = require("react-alegrify-ui");

const Head = require("../../components/lib/head");

function Index() {
  return (
    <html lang="en" dir="ltr">
      <Head title="My amazing website" />
      <Body>
        <Main>
          <H1>My amazing website</H1>
          <Section>
            <P>Put your amazing content over here :)</P>
          </Section>
        </Main>
        <Footer textCenter>
          Bootstrapped with alegrify-static-site
        </Footer>
      </Body>
    </html>
  );
}

module.exports = Index;
