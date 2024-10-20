export default function CodePenSnippet(props: { snippetId: string }) {
  const snippetId = props.snippetId
  return (
    snippetId && (
      <div className="shadow-nextjs dark:shadow-nextjs-dark w-full overflow-hidden rounded-lg">
        <iframe
          title="Codepen"
          src={`https://codepen.io/mk965/embed/${snippetId}?default-tab=result`}
          style={{
            width: '100%',
            height: '500px',
            border: '0',
            overflow: 'hidden',
          }}
          loading="lazy"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>
    )
  )
}
