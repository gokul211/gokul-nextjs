"use client"
import React from "react"; // Make sure React is imported if not already

export default function V62() {
  const [filters, setFilters] = React.useState({
    Gender: [],
    Category: [],
    Colors: [],
    Price: null,
    Tags: [],
  });


  const products = [
    {
      id: "5317960000000086571",
      name: "Hoodie",
      category: "Men",
      colors: ["Orange", "Yellow", "RosyBrown", "LightSlateGray"],
      price: 999.00,
      oldPrice: 1100.00,
      tags: ["Sale"],
      imageUrl: "/product-images/2.webp/5317960000000113001/400x400",
      variants: [
        { id: "5317960000000086535", attributes: ["Orange", "S"] },
        { id: "5317960000000086537", attributes: ["Orange", "M"] },
        { id: "5317960000000086539", attributes: ["Orange", "L"] },
        { id: "5317960000000086541", attributes: ["Orange", "XL"] },
        { id: "5317960000000086543", attributes: ["Yellow", "S"] },
        { id: "5317960000000086545", attributes: ["Yellow", "M"] },
        { id: "5317960000000086547", attributes: ["Yellow", "L"] },
        { id: "5317960000000086549", attributes: ["Yellow", "XL"] },
        { id: "5317960000000086551", attributes: ["RosyBrown", "S"] },
        { id: "5317960000000086553", attributes: ["RosyBrown", "M"] },
        { id: "5317960000000086555", attributes: ["RosyBrown", "L"] },
        { id: "5317960000000086557", attributes: ["RosyBrown", "XL"] },
        { id: "5317960000000086559", attributes: ["LightSlateGray", "S"] },
        { id: "5317960000000086561", attributes: ["LightSlateGray", "M"] },
        { id: "5317960000000086563", attributes: ["LightSlateGray", "L"] },
        { id: "5317960000000086565", attributes: ["LightSlateGray", "XL"] },
      ],
    },
    {
      id: "5317960000000103729",
      name: "Sweatshirts",
      category: "Men",
      colors: ["Orange", "DeepSkyBlue"],
      price: 1899.00,
      oldPrice: 1999.00,
      tags: ["Sale"],
      imageUrl: "/product-images/11.webp/5317960000000103809/400x400",
      variants: [
        { id: "5317960000000103717", attributes: ["Orange", "L"] },
        { id: "5317960000000103719", attributes: ["Orange", "XL"] },
        { id: "5317960000000103721", attributes: ["Orange", "XXL"] },
        { id: "5317960000000103723", attributes: ["DeepSkyBlue", "L"] },
        { id: "5317960000000103725", attributes: ["DeepSkyBlue", "XL"] },
        { id: "5317960000000103727", attributes: ["DeepSkyBlue", "XXL"] },
      ],
    },
    {
      id: "5317960000000103645",
      name: "Casual t-shirts",
      category: "Men",
      colors: ["White", "DeepSkyBlue", "LightPink"],
      price: 999.00,
      oldPrice: 1299.00,
      tags: ["Sale"],
      imageUrl: "/product-images/13.webp/5317960000000103697/400x400",
      variants: [
        { id: "5317960000000103639", attributes: ["DeepSkyBlue"] },
        { id: "5317960000000103641", attributes: ["White"] },
        { id: "5317960000000103643", attributes: ["LightPink"] },
      ],
    },
    {
      id: "5317960000000086801",
      name: "Formal Shirt",
      category: "Men",
      colors: ["SteelBlue", "White", "Green"],
      price: 899.00,
      oldPrice: 999.00,
      tags: [],
      imageUrl: "/product-images/4.webp/5317960000000086865/400x400",
      variants: [
        { id: "5317960000000086795", attributes: ["SteelBlue"] },
        { id: "5317960000000086797", attributes: ["White"] },
        { id: "5317960000000086799", attributes: ["Green"] },
      ],
    },
    {
      id: "5317960000000086891",
      name: "Festive Kurta",
      category: "Men",
      colors: ["Orange", "SteelBlue", "Red", "DeepSkyBlue", "Gold"],
      price: 999.00,
      oldPrice: null,
      tags: [],
      imageUrl: "/product-images/1.webp/5317960000000113013/400x400",
      variants: [
        { id: "5317960000000086883", attributes: ["Red"] },
        { id: "5317960000000086885", attributes: ["DeepSkyBlue"] },
        { id: "5317960000000086887", attributes: ["SteelBlue"] },
        { id: "5317960000000086889", attributes: ["Gold"] },
        { id: "5317960000000097003", attributes: ["Orange"] },
      ],
    },
    {
      id: "5317960000000103197",
      name: "Cotton Shirt",
      category: "Men",
      colors: [],
      price: 1299.00,
      oldPrice: 1599.00,
      tags: ["Sale"],
      imageUrl: "/product-images/3.webp/5317960000000103267/400x400",
      variants: [
        { id: "5317960000000103187", attributes: ["S"] },
        { id: "5317960000000103189", attributes: ["M"] },
        { id: "5317960000000103191", attributes: ["L"] },
        { id: "5317960000000103193", attributes: ["XL"] },
        { id: "5317960000000103195", attributes: ["XXL"] },
      ],
    },
    {
      id: "5317960000000103543",
      name: "White Tees",
      category: "Men",
      colors: [],
      price: 999.00,
      oldPrice: 1299.00,
      tags: ["Sale"],
      imageUrl: "/product-images/4.webp/5317960000000103617/400x400",
      variants: [
        { id: "5317960000000103533", attributes: ["S"] },
        { id: "5317960000000103535", attributes: ["M"] },
        { id: "5317960000000103537", attributes: ["L"] },
        { id: "5317960000000103539", attributes: ["XL"] },
        { id: "5317960000000103541", attributes: ["XXL"] },
      ],
    },
    {
      id: "5317960000000103837",
      name: "Baggy T-shirts",
      category: "Men",
      colors: ["DarkOrange", "LavenderBlush", "DarkSeaGreen", "Black"],
      price: 999.00,
      oldPrice: 1299.00,
      tags: ["Sale"],
      imageUrl: "/product-images/8.webp/5317960000000103945/400x400",
      variants: [
        { id: "5317960000000103821", attributes: ["DarkOrange", "XXL"] },
        { id: "5317960000000103823", attributes: ["DarkOrange", "XL"] },
        { id: "5317960000000103825", attributes: ["LavenderBlush", "XXL"] },
        { id: "5317960000000103827", attributes: ["LavenderBlush", "XL"] },
        { id: "5317960000000103829", attributes: ["DarkSeaGreen", "XXL"] },
        { id: "5317960000000103831", attributes: ["DarkSeaGreen", "XL"] },
        { id: "5317960000000103833", attributes: ["Black", "XXL"] },
        { id: "5317960000000103835", attributes: ["Black", "XL"] },
      ],
    },
  ];


  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "Price") {
        return {
          ...prevFilters,
          Price: prevFilters.Price === value ? null : value,
        };
      } else {
        const currentValues = prevFilters[filterType];
        if (currentValues.includes(value)) {
          return {
            ...prevFilters,
            [filterType]: currentValues.filter((item) => item !== value),
          };
        } else {
          return {
            ...prevFilters,
            [filterType]: [...currentValues, value],
          };
        }
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    // Gender filter (assuming all products are "Male" for this example)
    if (filters.Gender.length > 0 && !filters.Gender.includes("Male")) {
      return false;
    }

    // Category filter
    if (filters.Category.length > 0 && !filters.Category.includes(product.category)) {
      return false;
    }

    // Colors filter
    if (filters.Colors.length > 0) {
      const hasColor = filters.Colors.some((color) => product.colors.includes(color));
      if (!hasColor) {
        return false;
      }
    }

    // Price filter
    if (filters.Price) {
      const [min, max] = filters.Price.split("_").map(Number);
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Tags filter
    if (filters.Tags.length > 0) {
      const hasTag = filters.Tags.some((tag) => product.tags.includes(tag));
      if (!hasTag) {
        return false;
      }
    }

    return true;
  });

  const getCategoryCount = (category) => {
    return products.filter((p) => p.category === category).length;
  };

  const getColorCount = (color) => {
    return products.filter((p) => p.colors.includes(color)).length;
  };

  const getTagCount = (tag) => {
    return products.filter((p) => p.tags.includes(tag)).length;
  };

  const getPriceRangeCount = (min, max) => {
    return products.filter((p) => p.price >= min && p.price <= max).length;
  };

  return (
    <div className="theme-collection-section theme-productfilter-enable">
      <div className="zpcontainer">
        <div className="theme-filters-container">
          <div data-zs-filter-container="" className="theme-produt-filter-row">
            <div className="theme-filters-header theme-filters-header-mobile">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14.3565 21.2333C14.2432 21.2333 14.1299 21.2075 14.0253 21.155L10.3216 19.3033C10.0707 19.1779 9.91197 18.9212 9.91197 18.6408V12.8567L2.67992 4.30461C2.49367 4.08461 2.45242 3.77628 2.57367 3.51461C2.69492 3.25295 2.95742 3.08545 3.24575 3.08545H21.764C22.0523 3.08545 22.3144 3.25295 22.4361 3.51461C22.5573 3.77628 22.5161 4.08461 22.3298 4.30461L15.0978 12.8567V20.4929C15.0978 20.7495 14.9649 20.9879 14.7465 21.1229C14.6278 21.1962 14.4924 21.2337 14.357 21.2337L14.3565 21.2333ZM11.3936 18.1829L13.6157 19.2941V12.5854C13.6157 12.4104 13.6778 12.2408 13.7907 12.1071L20.1673 4.56711H4.842L11.2186 12.1071C11.3316 12.2408 11.3936 12.4104 11.3936 12.5854V18.1833V18.1829Z" fill="black"></path>
              </svg>
              <div>Filter</div>
              <div data-theme-product-filter-overlay="" className="theme-product-filter-mobile-overlay">
                <svg className="theme-close-mobile-filter" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M27.0898 25.1016L21.9883 20L27.0898 14.8984C27.6406 14.3477 27.6406 13.4609 27.0898 12.9102C26.5391 12.3594 25.6523 12.3594 25.1016 12.9102L20 18.0117L14.8984 12.9102C14.3477 12.3594 13.4609 12.3594 12.9102 12.9102C12.3594 13.4609 12.3594 14.3477 12.9102 14.8984L18.0117 20L12.9102 25.1016C12.3594 25.6523 12.3594 26.5391 12.9102 27.0898C13.4609 27.6406 14.3477 27.6406 14.8984 27.0898L20 21.9883L25.1016 27.0898C25.6523 27.6406 26.5391 27.6406 27.0898 27.0898C27.6367 26.5391 27.6367 25.6484 27.0898 25.1016Z" fill="black"></path>
                </svg>
              </div>
            </div>
            <div className="theme-mobile-filters">
              {/* Gender Filter */}
              <div data-zs-filter-option-container="Gender" className="theme-product-filter-box theme-filters-style-fashion">
                <div data-zs-filter-option-name="" className="theme-product-filter-type">
                  <span className="theme-filter-expand-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M7.78788 10L6 11.8201L16 22L26 11.8201L24.2121 10L16 18.3599L7.78788 10Z" fill="black"></path>
                    </svg>
                  </span>
                  <span>Gender</span>
                </div>
                <div data-zs-filter-option-values-wrapper="">
                  <div className="theme-product-filter-option-container">
                    <div className="theme-product-filter-select-option">
                      <input
                        data-zs-filter-option-value=""
                        className="theme-product-filter-check"
                        type="checkbox"
                        name="gender"
                        checked={filters.Gender.includes("Male")}
                        onChange={() => handleFilterChange("Gender", "Male")}
                      />
                      <span className="theme-product-filter-custom-check">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                          <path d="M3.8482 7.84786L0.200195 4.19986L1.1122 3.28786L3.8482 6.02385L9.7202 0.151855L10.6322 1.06386L3.8482 7.84786Z" fill="white"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="theme-product-filter-text">Male</div>
                    <div className="theme-product-filter-count">(5)</div>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div data-zs-filter-option-container="Category" className="theme-product-filter-box theme-filters-style-fashion">
                <div data-zs-filter-option-name="" className="theme-product-filter-type">
                  <span className="theme-filter-expand-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M7.78788 10L6 11.8201L16 22L26 11.8201L24.2121 10L16 18.3599L7.78788 10Z" fill="black"></path>
                    </svg>
                  </span>
                  <span>Category</span>
                </div>
                <div data-zs-filter-option-values-wrapper="">
                  <div className="theme-product-filter-option-container">
                    <ul>
                      <li>
                        <span className="theme-product-filter-text theme-parent-category">
                          <a href="javascript:;">Men</a>
                        </span>
                        <ul>
                          <li data-zs-filter-option-value-container="">
                            <span className="theme-product-filter-text">
                              <a href="javascript:;" onClick={() => handleFilterChange("Category", "Hoodies")}>Hoodies</a>
                            </span>
                            <span className="theme-product-filter-count">({getCategoryCount("Hoodies")})</span>
                          </li>
                          <li data-zs-filter-option-value-container="">
                            <span className="theme-product-filter-text">
                              <a href="javascript:;" onClick={() => handleFilterChange("Category", "Shirts")}>Shirts</a>
                            </span>
                            <span className="theme-product-filter-count">({getCategoryCount("Shirts")})</span>
                          </li>
                          <li data-zs-filter-option-value-container="">
                            <span className="theme-product-filter-text">
                              <a href="javascript:;" onClick={() => handleFilterChange("Category", "Ethnic")}>Ethnic</a>
                            </span>
                            <span className="theme-product-filter-count">({getCategoryCount("Ethnic")})</span>
                          </li>
                          <li data-zs-filter-option-value-container="">
                            <span className="theme-product-filter-text">
                              <a href="javascript:;" onClick={() => handleFilterChange("Category", "T-shirts")}>T-shirts</a>
                            </span>
                            <span className="theme-product-filter-count">({getCategoryCount("T-shirts")})</span>
                          </li>
                          <li data-zs-filter-option-value-container="">
                            <span className="theme-product-filter-text">
                              <a href="javascript:;" onClick={() => handleFilterChange("Category", "Sweatshirts")}>Sweatshirts</a>
                            </span>
                            <span className="theme-product-filter-count">({getCategoryCount("Sweatshirts")})</span>
                          </li>
                          <li data-zs-filter-option-value-container="" style={{ display: "none" }}>
                            <span className="theme-product-filter-text">
                              <a href="javascript:;" onClick={() => handleFilterChange("Category", "Jeans")}>Jeans</a>
                            </span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <a data-zs-filter-option-showmore-btn="" href="javascript:;" className="theme-product-filter-show-more">Show more</a>
                  <a data-zs-filter-option-showless-btn="" href="javascript:;" className="theme-product-filter-show-more" style={{ display: "none" }}>Show less</a>
                </div>
              </div>

              {/* Colors Filter */}
              <div data-zs-filter-option-container="Colors" className="theme-product-filter-box theme-filters-style-fashion">
                <div data-zs-filter-option-name="" className="theme-product-filter-type">
                  <span className="theme-filter-expand-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M7.78788 10L6 11.8201L16 22L26 11.8201L24.2121 10L16 18.3599L7.78788 10Z" fill="black"></path>
                    </svg>
                  </span>
                  <span>Colors</span>
                </div>
                <div data-zs-filter-option-values-wrapper="">
                  <div className="theme-product-filter-color-container">
                    {[
                      { name: "Orange", hex: "#FFA500" },
                      { name: "Yellow", hex: "#FFFF00" },
                      { name: "RosyBrown", hex: "#BC8F8F" },
                      { name: "LightSlateGray", hex: "#778899" },
                      { name: "SteelBlue", hex: "#4682B4" },
                      { name: "White", hex: "#FFFFFF" },
                      { name: "Green", hex: "#008000" },
                      { name: "Red", hex: "#FF0000" },
                      { name: "DeepSkyBlue", hex: "#00BFFF" },
                      { name: "Gold", hex: "#FFD700" },
                      { name: "LightPink", hex: "#FFB6C1" },
                      { name: "DarkOrange", hex: "#FF8C00" },
                      { name: "LavenderBlush", hex: "#FFF0F5" },
                      { name: "DarkSeaGreen", hex: "#8FBC8B" },
                      { name: "Black", hex: "#000000" },
                    ].map((color) => (
                      <div key={color.name} data-zs-filter-option-value-container="" className="theme-product-filter-option-container">
                        <div className="theme-product-filter-select-option">
                          <input
                            data-zs-filter-option-value=""
                            className="theme-product-filter-check"
                            type="checkbox"
                            name="color"
                            checked={filters.Colors.includes(color.name)}
                            onChange={() => handleFilterChange("Colors", color.name)}
                          />
                          <span className="theme-product-filter-custom-check new-face" style={{ backgroundColor: color.hex }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M3.8482 7.84786L0.200195 4.19986L1.1122 3.28786L3.8482 6.02385L9.7202 0.151855L10.6322 1.06386L3.8482 7.84786Z" fill="white"></path>
                            </svg>
                          </span>
                        </div>
                        <div className="theme-product-filter-text">{color.name}</div>
                        <div className="theme-product-filter-count">({getColorCount(color.name)})</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div data-zs-filter-option-container="Price" className="theme-product-filter-box theme-filters-style-fashion">
                <div data-zs-filter-option-name="" className="theme-product-filter-type">
                  <span className="theme-filter-expand-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M7.78788 10L6 11.8201L16 22L26 11.8201L24.2121 10L16 18.3599L7.78788 10Z" fill="black"></path>
                    </svg>
                  </span>
                  <span>Price</span>
                </div>
                <div data-zs-filter-option-values-wrapper="">
                  {[
                    { min: 500.0, max: 1000.0 },
                    { min: 1000.0, max: 1500.0 },
                    { min: 1500.0, max: 100000.0 },
                  ].map((range) => (
                    <div key={`${range.min}_${range.max}`} data-zs-filter-option-value-container="" className="theme-product-filter-option-container">
                      <div className="theme-product-filter-select-option">
                        <input
                          data-zs-filter-option-value=""
                          className="theme-product-filter-check"
                          type="radio"
                          name="price"
                          checked={filters.Price === `${range.min}_${range.max}`}
                          onChange={() => handleFilterChange("Price", `${range.min}_${range.max}`)}
                        />
                        <span className="theme-product-filter-custom-radio theme-product-filter-custom-check">
                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                            <path d="M3.8482 7.84786L0.200195 4.19986L1.1122 3.28786L3.8482 6.02385L9.7202 0.151855L10.6322 1.06386L3.8482 7.84786Z" fill="white"></path>
                          </svg>
                        </span>
                      </div>
                      <div data-zs-filter-option-value-price-formatted="" className="theme-product-filter-text">
                        <span className="theme-product-filter-min-price">Rs.{range.min.toFixed(2)}</span> -{" "}
                        <span className="theme-product-filter-max-price">Rs.{range.max.toFixed(2)}</span>
                      </div>
                      <div className="theme-product-filter-count">({getPriceRangeCount(range.min, range.max)})</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div data-zs-filter-option-container="Tags" className="theme-product-filter-box theme-filters-style-fashion">
                <div data-zs-filter-option-name="" className="theme-product-filter-type">
                  <span className="theme-filter-expand-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M7.78788 10L6 11.8201L16 22L26 11.8201L24.2121 10L16 18.3599L7.78788 10Z" fill="black"></path>
                    </svg>
                  </span>
                  <span>Tags</span>
                </div>
                <div data-zs-filter-option-values-wrapper="">
                  {[
                    { name: "Best Seller" },
                    { name: "New" },
                    { name: "Sale" }, // Added Sale tag as it appears in product data
                  ].map((tag) => (
                    <div key={tag.name} data-zs-filter-option-value-container="" className="theme-product-filter-option-container">
                      <div className="theme-product-filter-select-option">
                        <input
                          data-zs-filter-option-value=""
                          className="theme-product-filter-check"
                          type="checkbox"
                          name="tag"
                          checked={filters.Tags.includes(tag.name)}
                          onChange={() => handleFilterChange("Tags", tag.name)}
                        />
                        <span className="theme-product-filter-custom-check">
                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                            <path d="M3.8482 7.84786L0.200195 4.19986L1.1122 3.28786L3.8482 6.02385L9.7202 0.151855L10.6322 1.06386L3.8482 7.84786Z" fill="white"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="theme-product-filter-text">{tag.name}</div>
                      <div className="theme-product-filter-count">({getTagCount(tag.name)})</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="zprow theme-produt-category-list-row">
          <div className="zpcol-md-12 zpcol-sm-12">
            <div className="zprow theme-product-ratio" data-sort-by-products-target="">
              {filteredProducts.map((product) => (
                <div key={product.id} className="theme-prod-box theme-product-list-style-12 theme-product-count-xsm-02 theme-product-count-sm-03 theme-product-count-md-04">
                  <div className="theme-product-box-content">
                    <div className="theme-product-image-area">
                      {product.tags.includes("Sale") && (
                        <div className="theme-product-ribbon-area">
                          <div className="theme-product-sale-ribbon">
                            <span className="theme-sale-message"> Sale </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="60" viewBox="0 0 43 60" fill="none">
                              <path d="M0.177979 0H42.3734V56.5947C42.3734 59.0989 39.7124 60.7063 37.4958 59.5412L22.8246 51.8291C21.8549 51.3194 20.6965 51.3194 19.7269 51.8291L5.05559 59.5412C2.839 60.7063 0.177979 59.0989 0.177979 56.5947V0Z" fill="url(#paint0_linear_3421_6824)"></path>
                              <defs>
                                <linearGradient id="paint0_linear_3421_6824" x1="21.2757" y1="0" x2="21.2757" y2="62.1051" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#BF0000"></stop>
                                  <stop offset="0.141962" stopColor="#F60D0D"></stop>
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      )}
                      <a href={`/products/${product.name.toLowerCase().replace(/ /g, "-")}/${product.id}`} aria-label={product.name} alt={product.name}>
                        <picture>
                          <img data-src={product.imageUrl} alt={product.name} title={product.name} style={{ display: "block" }} loading="eager" rel="preload" src={product.imageUrl} />
                        </picture>
                      </a>
                      <div className="theme-product-list-variants">
                        {product.colors.length > 0 && (
                          <div className="theme-product-list-variant-option">
                            <div className="theme-product-color-variant-container">
                              <div className="theme-product-color-variations" data-zs-attribute-select="" data-zs-attribute-name="Color">
                                {product.colors.map((color) => (
                                  <span key={color} className="theme-product-color">
                                    <label data-theme-color-label="" style={{ backgroundColor: color.toLowerCase().replace(/ /g, "") }} className="">
                                      <input type="radio" name={`${product.id}-color`} data-zs-attribute-option="" value={color} data-text={color} className="blur-option" />
                                    </label>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="theme-product-details-area">
                      <div className="theme-product-name-rating-price">
                        <div className="theme-name-and-rating">
                          <div className="theme-product-name">
                            <a href={`/products/${product.name.toLowerCase().replace(/ /g, "-")}/${product.id}`} aria-label={product.name}>{product.name}</a>
                          </div>
                        </div>
                        <div className="theme-product-price">
                          <div data-zs-pricing-container="">
                            <div className="theme-product-price-area" style={{ display: "block" }}>
                              <span className="theme-product-total-price-lable"> Rs.{product.price.toFixed(2)} </span>
                              {product.oldPrice && <span className="theme-product-total-old-price"> Rs.{product.oldPrice.toFixed(2)} </span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="theme-cta-area">
                        <a className="theme-quick-view-icon" aria-label="Quick View" href={`/products/${product.name.toLowerCase().replace(/ /g, "-")}/${product.id}?quick_look=true`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"></path>
                          </svg>
                          <span className="theme-quickview-text">Quick View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}