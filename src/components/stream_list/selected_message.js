import "twin.macro"
import { CopyButton } from "@components/copy_button"

export const SelectedMessage = ({ message, close }) => {
  return (
    <section
      tw="sticky top-0 bottom-0 right-0 z-10 flex-none overflow-hidden inset-y-0 pl-10 max-w-full flex"
      aria-labelledby="slide-over-heading"
    >
      <div tw="w-screen max-w-md">
        <div tw="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
          <div tw="py-6 px-4 bg-blue-700 sm:px-6">
            <div tw="flex items-center justify-between">
              <h2 id="slide-over-heading" tw="text-lg font-medium text-white">
                {message.type}
              </h2>
              <div tw="ml-3 h-7 flex items-center">
                <button
                  tw="bg-blue-700 rounded-md text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={close}
                >
                  <span tw="sr-only">Close panel</span>
                  <svg
                    tw="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div tw="mt-3 text-xs font-mono">
              <dl tw="grid grid-cols-2 gap-3">
                <div tw="col-span-2" className="group">
                  <dt tw="pr-4 text-blue-300">streamName</dt>
                  <dd tw="mt-1 text-blue-200 truncate text-sm">
                    <HeaderDataValue value={message.stream_name} />
                  </dd>
                </div>
                <div className="group">
                  <dt tw="pr-4 text-blue-300">position</dt>
                  <dd tw="mt-1 text-blue-200 text-sm">
                    <HeaderDataValue value={message.position} />
                  </dd>
                </div>
                <div className="group">
                  <dt tw="pr-4 text-blue-300">globalPosition</dt>
                  <dd tw="mt-1 text-blue-200 text-sm">
                    <HeaderDataValue value={message.global_position} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div tw="mt-6 relative flex-1 px-4 sm:px-6 py-6 text-xs">
            <div tw="absolute inset-0 px-4 sm:px-6">
              <DataTable title="Data" data={message.data} />

              {message.metadata && (
                <DataTable title="Metadata" data={message.metadata} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const DataTable = ({ title, data }) => (
  <div>
    <h2 tw="text-sm font-bold mb-2">{title}</h2>

    <dl tw="font-mono pb-4 space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="group">
          <dt tw="pr-4 text-gray-600">{key}</dt>
          <dd tw="mt-1 text-gray-900 text-sm">
            <DataValue value={JSON.stringify(value, null, 2)} />
          </dd>
        </div>
      ))}
    </dl>
  </div>
)

const HeaderDataValue = ({ value }) => {
  return (
    <div tw="flex items-start gap-2">
      <div tw="w-auto break-all resize-none whitespace-pre overflow-auto flex-grow" className="no-scrollbar">
        <pre>{value}</pre>
      </div>
      <CopyButton value={value} variant="header" />
    </div>
  )
}

const DataValue = ({ value }) => {
  return (
    <div tw="flex items-start gap-2">
      <div tw="w-auto break-all resize-none whitespace-pre overflow-auto flex-grow" className="no-scrollbar">
        <pre>{value}</pre>
      </div>
      <CopyButton value={value} />
    </div>
  )
}
