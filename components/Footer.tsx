const Footer = () => {
  return (
    <footer className="bg-white border-t bottom-0 w-full">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; {new Date().getFullYear()} Store, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
