import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { databases } from "@/lib/appwrite"; // Ensure Appwrite is installed

// 🔴 YOUR APPWRITE IDS
const PROJECT_ID = '696cc73500312d213cc4'; 
const DB_ID = '696cc77f003a45278198'; 
const BUCKET_ID = '696d15640025ce6316c0'; 
const COLLECTION_ID = '696d15640025ce6316c0'; // ⚠️ MAKE SURE YOU CREATED THIS COLLECTION IN APPWRITE

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Appwrite
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await databases.listDocuments(DB_ID, COLLECTION_ID);
        
        // Map Appwrite Data to UI Format
        const mappedImages = response.documents.map((doc) => ({
          id: doc.$id,
          title: doc.title,
          description: doc.description,
          category: doc.category, // e.g. "Sports", "Events"
          date: new Date(doc.date).toLocaleDateString(),
          // Generate Image URL
          image: `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${doc.photoId}/view?project=${PROJECT_ID}`
        }));

        setGalleryImages(mappedImages);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // 2. Get unique categories dynamically from fetched data
  const categories = [
    { id: "all", name: "All Events" },
    ...Array.from(
      new Map(
        galleryImages
          .filter((img) => img.category && img.category !== "all")
          .map((img) => [img.category, { id: img.category, name: img.category }])
      ).values()
    ),
  ];

  // 3. Filter images based on selected category
  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-8 bg-cream">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-mustard font-medium text-sm uppercase tracking-wider">
                Memory Lane
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-olive mt-4">
                School Gallery
              </h1>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
                Celebrating moments of joy, learning, and achievement. Explore the vibrant
                school functions and memorable events captured throughout the year.
              </p>
            </motion.div>
          </div>
          <WaveDivider fillColor="hsl(var(--beige))" className="mt-12" />
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-beige">
          <div className="container mx-auto px-4">
            
            {/* Loading State */}
            {loading ? (
               <div className="text-center py-20 text-gray-500">Loading memories...</div>
            ) : (
              <>
                {/* Category Filter */}
                {categories.length > 1 && (
                  <div className="flex justify-center mb-16">
                    <Tabs
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                      className="w-full md:w-auto"
                    >
                      <TabsList className="bg-olive/10 p-2 flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                          <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 data-[state=active]:bg-olive data-[state=active]:text-cream hover:bg-olive/20"
                          >
                            {/* Capitalize Category Name */}
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                )}

                {/* Image Grid */}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredImages.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-500">
                      No images found.
                    </div>
                  ) : (
                    filteredImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-lg transition-all duration-300"
                      >
                        {/* Image Container */}
                        <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gradient-to-br from-olive/20 to-mustard/20">
                          <img
                            src={image.image}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white font-serif text-xl font-bold mb-2">
                              {image.title}
                            </h3>
                            <p className="text-cream/90 text-sm">{image.description}</p>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 bg-mustard text-olive px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.category}
                        </div>

                        {/* Info Section */}
                        <div className="p-6">
                          <h3 className="font-serif text-lg font-bold text-olive mb-2 truncate">
                            {image.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {image.description}
                          </p>
                          <p className="text-mustard text-xs font-semibold mt-3">
                            {image.date}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;