Config = {}


Config.Framework = 'ESX' --ESX, QBCore

Config.Webhook = 'yourdiscordwebhook' --Webhook Link for Logs

Config.UseItem = false

Config.ItemName = "chips"

Config.UseMoney = true

Config.BettingTime = 20 --in seconds

Config.ActivateSounds = true

Config.OpenPoints = {

    ['OpenPosition1'] = vector3(-1821.0070, -1191.9586, 14.3089),
    ['OpenPosition2'] = vector3(0, 0, 0)

}

Config.OpenRange = 3.0;


Config.Dealers = {     
    {
        CustomPed = false, 
        Coords = vector3(0, 0, 0),
        Heading = 0, 
        PedId = "mp_m_freemode_01", -- "mp_m_freemode_01" for custom male dealer and "mp_f_freemode_01" for custom female dealer --> turn CustomPed = true        otherwise CustomPed = false 
        HelmetId = 2, 
        HelmetId2 = 2, 
        HairsId = 22, 
        HairsId2 = 0, 
        SkinId = 2, 
        FaceId = 20, 
        FaceId2 = 0,
        GlassedId = 22, 
        GlassedId2 = 0, 
        TShirtId = 30, 
        TShirtId2 = 0, 
        TorsoId = 30, 
        TorsoId2 = 0, 
        PantsId = 20, 
        PantsId2 = 0, 
        ArmsId = 20, 
        ArmsId2 = 0,
        ShoesId = 22, 
        ShoesId2 = 0,
     },
     {
        CustomPed = false, 
        Coords = vector3(0, 0, 0),
        Heading = 0, 
        PedId = "mp_m_freemode_01", -- "mp_m_freemode_01" for custom male dealer and "mp_f_freemode_01" for custom female dealer --> turn CustomPed = true        otherwise CustomPed = false 
        HelmetId = 2, 
        HelmetId2 = 2, 
        HairsId = 22, 
        HairsId2 = 0, 
        SkinId = 2, 
        FaceId = 20, 
        FaceId2 = 0,
        GlassedId = 22, 
        GlassedId2 = 0, 
        TShirtId = 30, 
        TShirtId2 = 0, 
        TorsoId = 30, 
        TorsoId2 = 0, 
        PantsId = 20, 
        PantsId2 = 0, 
        ArmsId = 20, 
        ArmsId2 = 0,
        ShoesId = 22, 
        ShoesId2 = 0,
    }
}





















