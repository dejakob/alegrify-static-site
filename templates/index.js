const React = require("react");
const { Body, Main, H1 } = require("react-alegrify-ui");

const Head = require("../../components/lib/head");

function Index() {
  return (
    <html lang="en" dir="ltr">
      <Head title="My amazing website" />
      <Body>
        <Main>
          <H1>My amazing website</H1>
        </Main>
      </Body>
    </html>
  );
}

module.exports = Index;
