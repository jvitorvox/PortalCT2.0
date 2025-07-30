# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["CasaTerra.Portal.API/CasaTerra.Portal.API.csproj", "CasaTerra.Portal.API/"]
COPY ["CasaTerra.Portal.Core/CasaTerra.Portal.Core.csproj", "CasaTerra.Portal.Core/"]
COPY ["CasaTerra.Portal.Infrastructure/CasaTerra.Portal.Infrastructure.csproj", "CasaTerra.Portal.Infrastructure/"]

RUN dotnet restore "CasaTerra.Portal.API/CasaTerra.Portal.API.csproj"

# Copy source code and build
COPY . .
WORKDIR "/src/CasaTerra.Portal.API"
RUN dotnet build "CasaTerra.Portal.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "CasaTerra.Portal.API.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Install dependencies for Active Directory
RUN apt-get update && apt-get install -y \
    libldap-2.4-2 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=publish /app/publish .

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "CasaTerra.Portal.API.dll"]