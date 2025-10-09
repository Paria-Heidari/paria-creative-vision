
export const Hero = () => {
  return (
    <div className="relative inset-0 w-full h-[90vh] flex text-accent">
      <video
        autoPlay
        muted
        playsInline
        controls
        className="absolute inset-0 w-full h-full object-cover justify-center"
      >
        <source src="/videos/IMG_1174.mov" type="video/mp4" />
      </video>
      <div className="absolute z-10 bottom-50 left-1/7">
        <h1 className="text-5xl tracking-wider font-syne">
          Exploring the World Through Code and Lens
        </h1>
        <p className="text-xl tracking-widest font-inter">
          Visual Stories by Paria
        </p>
      </div>
    </div>
  );
}
