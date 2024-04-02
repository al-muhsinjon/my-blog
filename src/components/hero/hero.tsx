import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { format } from "date-fns";
import { HeroProps } from "./hero.props";
import { calculateEstimatedTimeToRead } from "@/src/helpers/time.format";
import { useRouter } from "next/navigation";

const Hero = ({ blogs }: HeroProps) => {
  const router = useRouter();
  return (
    <Box
      width={"100%"}
      mt={"9vh"}
      height={"70vh"}
      sx={{ backgroundColor: "red" }}
    >
      <Carousel
        responsive={{
          mobile: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
          },
        }}
      >
        {blogs.map((item) => (
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(`/blog/${item.slug}`)}
            key={item.id}
          >
            <Box sx={{ position: "relative", width: "100%", height: "70vh" }}>
              <Image
                src={item.image.url}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              />
              <Box
                position="relative"
                color={"white"}
                width={{ xs: "100%", md: "70%" }}
                sx={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  paddingLeft: { xs: "10px", md: "50px" },
                }}
                zIndex={999}
              >
                <Typography sx={{ fontSize: { xs: "30px", md: "50px" } }}>
                  {item.title}
                </Typography>
                <Typography
                  color={"gray"}
                  sx={{ fontSize: { xs: "25px", md: "30px" } }}
                >
                  {item.exerpt}
                </Typography>
                <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                  <Avatar alt={item.author.name} src={item.author.avatar.url} />
                  <Box>
                    <Typography>{item.author.name}</Typography>
                    <Box>
                      {format(new Date(), "dd MMM, yyyy")} &#x2022;{" "}
                      {calculateEstimatedTimeToRead(item.description.text)}min
                      read{" "}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Hero;

const data = [
  {
    image: "https://media.graphassets.com/MxJZhmooRRuudoErkQ38",
    title: "Technical SEO with Hygraph",
    exerpt:
      "Get started with your SEO implementation when using a Headless CMS",
    author: {
      name: "Samar Badriddinov",
      image: "https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx",
    },
  },
  {
    image: "https://media.graphassets.com/bh3K2NNtTHCN260Xfq9h",
    title: "Union Types and Sortable Relations with Hygraph",
    exerpt:
      "Learn more about Polymorphic Relations and Sortable Relations with Hygraph",
    author: {
      name: "Samar Badriddinov",
      image: "https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx",
    },
  },
];
