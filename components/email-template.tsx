import * as React from "react"

interface EmailTemplateProps {
  description: string
  email: string
  topics: Array<string>
  name: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ description, topics, email, name }) => (
  <div>
    <h3>Topics:</h3>
    <ul>
      {topics.map((topic) => (
        <li key={topic}>{topic}</li>
      ))}
    </ul>
    <h3>Description</h3>
    <p>{description}</p>
    <br />
    <hr />
    <p>
      Reply quickly to this client by{" "}
      <a
        href={`mailto:${email}?subject=Hello%20${name}&body=Hi,\n\nI%20am%20glad%20you%20decided%20to%20put%20your%20confidence%20in%20my%20services.%20I%20have%20reviewed%20your%20request%20and%20I%20am%20excited%20to%20work%20with%20you%20soon.\n\nRegards.`}>
        clicking here
      </a>
    </p>
  </div>
)

export default EmailTemplate
