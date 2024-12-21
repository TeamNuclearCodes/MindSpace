const Button = ({type,text,variant,extraClasses,handleClick,leftIcon, rightIcon}) => {
  const styles = {
    black: "bg-black text-white hover:bg-zinc-900 hover:text-white",
    gradient: "transition-all duration-400 bg-gradient text-black hover:from-fuchsia-800 hover:to-purple-800 hover:text-white",
    delete: "bg-red-800 hover:bg-red-900",
    edit: "bg-blue-800 hover:bg-blue-900",
    check: "bg-green-800 hover:bg-green-900",
    chatbtn: "bg-purple-800 hover:bg-purple-900",
    danger: "bg-zinc-950 border-red-800 border-2 hover:border-zinc-950 hover:bg-red-800 text-red-800 hover:text-zinc-950",
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <button type={type} 
        className={`flex gap-2 items-center py-2 px-4 rounded-md focus:rounded-md ${styles[variant]} ${extraClasses}`}
        onClick={handleClick}
      >
        {leftIcon}{text}{rightIcon}
      </button>
    </div>
  )
}

export default Button