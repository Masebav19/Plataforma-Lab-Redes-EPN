export default function Image ({ url, index }) {
        return(
            <div>
                <img src={url} alt={`Foto${index}`} />
            </div>
        )
  }