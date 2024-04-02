import { Content, Sidebar } from "@/src/components";
import { BlogsType } from "@/src/interfaces/blogs.interface";
import { CategoryType } from "@/src/interfaces/categories.interface";
import Layout from "@/src/layout/layout";
import Seo from "@/src/layout/seo/seo";
import { BlogService } from "@/src/services/blog.service";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const CategoryDetailedPage = ({
  blogs,
  latestBlogs,
  categories,
}: DetailedCategoriesPageProps) => {
  const router = useRouter();
  return (
    <Seo metaTitle={`${router.query.slug}-category`}>
      <Layout>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
            padding: "20px",
          }}
        >
          <Sidebar latestBlogs={latestBlogs} categories={categories} />
          <Content blogs={blogs} />
        </Box>
      </Layout>
    </Seo>
  );
};

export default CategoryDetailedPage;

export const getServerSideProps: GetServerSideProps<
  DetailedCategoriesPageProps
> = async ({ query }) => {
  const blogs = await BlogService.getDetailedCategoriesBlog(
    query.slug as string
  );
  const latestBlogs = await BlogService.getLatestBlog();
  const categories = await BlogService.getCategories();

  return {
    props: {
      blogs,
      latestBlogs,
      categories,
    },
  };
};

interface DetailedCategoriesPageProps {
  blogs: BlogsType[];
  latestBlogs: BlogsType[];
  categories: CategoryType[];
}
