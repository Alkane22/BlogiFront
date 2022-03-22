const Message = ({ message, error }) => {
  if(message === null){
    return null
  }

  if(error){
    return(
      <div className={'redMessage'}>
        {message}
      </div>
    )
  } else {
    return(
      <div className={'greenMessage'}>
        {message}
      </div>
    )
  }
}

export default Message