const Notification = (props) => {
    if (props.message === null) {
      return null
    }
  
    return (
      <div className={props.class}>
        {props.message}
      </div>
    )
  }

  export default Notification