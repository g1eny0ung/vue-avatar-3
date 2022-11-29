import { ref } from 'vue'
import { render } from '@testing-library/vue'
import useLoaded from './useLoaded'

import Avatar from './Avatar.vue'

vi.mock('./useLoaded')

describe('Avatar', () => {
  it('renders a image correctly', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(true),
      }
    })
    const { container, getByRole } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
      },
    })

    expect(container).toMatchSnapshot()
    expect(getByRole('img')).toHaveAttribute('src', 'https://fakeimg.pl/300/')
  })

  it('if the image is not loaded, it should render a letter avatar', () => {
    vi.mocked(useLoaded).mockImplementationOnce(() => {
      return {
        loading: ref(false),
        loaded: ref(false),
      }
    })
    const { container, getByText } = render(Avatar, {
      props: {
        src: 'https://fakeimg.pl/300/',
        name: 'John Doe',
      },
    })

    expect(container).toMatchSnapshot()
    expect(getByText('JD')).toBeInTheDocument()
  })
})
