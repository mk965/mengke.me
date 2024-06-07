import { siteMetadata } from '~/data/siteMetadata'

export default function SocialAccounts() {
  return (
    <div>
      <p className="my-3">Get in touch with me via my social media accounts:</p>
      <div className="flex space-x-4">
        <a
          href={siteMetadata.github}
          target="_blank"
          className="text-sm text-gray-500 transition hover:text-gray-600"
          data-umami-event="contact-github"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Github</span>
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700 fill-current hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <a
          href={`mailto:${siteMetadata.email}`}
          target="_self"
          className="text-sm text-gray-500 transition hover:text-gray-600"
          data-umami-event="contact-mail"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Mail</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-6 h-6 text-gray-700 fill-current hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </a>
        <a
          href={siteMetadata.telegram}
          target="_blank"
          className="text-sm text-gray-500 transition hover:text-gray-600"
          data-umami-event="contact-telegram"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Telegram</span>
          <svg
            role="img"
            className="w-6 h-6 text-gray-700 fill-current hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
            viewBox="0 0 1024 1024"
            height="22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M679.428571 746.857143l84-396q5.142857-25.142857-6-36t-29.428571-4L234.285714 501.142857q-16.571429 6.285714-22.571428 14.285714t-1.428572 15.142858 18.285715 11.142857l126.285714 39.428571 293.142857-184.571428q12-8 18.285714-3.428572 4 2.857143-2.285714 8.571429l-237.142857 214.285714-9.142857 130.285714q13.142857 0 25.714285-12.571428l61.714286-59.428572 128 94.285715q36.571429 20.571429 46.285714-21.714286z m344.571429-234.857143q0 104-40.571429 198.857143t-109.142857 163.428571-163.428571 109.142857-198.857143 40.571429-198.857143-40.571429-163.428571-109.142857-109.142857-163.428571T0 512t40.571429-198.857143 109.142857-163.428571T313.142857 40.571429 512 0t198.857143 40.571429 163.428571 109.142857 109.142857 163.428571 40.571429 198.857143z"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}
