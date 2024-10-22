import { createFileRoute } from '@tanstack/react-router'
import { valibotSearchValidator } from '@tanstack/router-valibot-adapter'
import { array, object, optional, pipe, string, transform, union } from 'valibot'
import { TextToSpeechPlayer } from '../../components/TextToSpeechPlayer'
import { Head } from '../../components/shared/Head'
import { PROJECT_NAME } from '../../constants/project'

const validationSearchParams = object({
  params: optional(
    union([
      pipe(
        string(),
        transform((value) => [value]),
      ),
      array(string()),
    ]),
  ),
})

export const Route = createFileRoute('/_layout/')({
  validateSearch: valibotSearchValidator(validationSearchParams),
  component: () => <Home />,
})

const Home = () => {
  const { params } = Route.useSearch()

  return (
    <div>
      <Head title="Home" description={`Top Page of ${PROJECT_NAME}`} />
      <p>Hello {PROJECT_NAME} !</p>
      <TextToSpeechPlayer />
      {params !== undefined && params.length > 0 && (
        <p>Params: {params.map((param) => param).join(', ')}</p>
      )}
    </div>
  )
}
